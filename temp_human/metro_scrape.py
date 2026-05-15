"""Scrape les prix Metro Cash & Carry pour le budget gala.

Setup ·
  pip install playwright
  playwright install chromium

Avant de lancer · cree un fichier .metro_creds (non commit) avec :
  METRO_EMAIL=ton_email@gmail.com
  METRO_PASS=ton_mot_de_passe

Lance · python metro_scrape.py
Resultat · metro_prices.csv (a coller dans le chat)
"""
import os
import csv
import time
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

# Lecture des credentials depuis .metro_creds (jamais en clair dans le code)
CREDS_FILE = Path(".metro_creds")
if not CREDS_FILE.exists():
    print(f"Cree d'abord {CREDS_FILE} avec :")
    print("METRO_EMAIL=ton_email@gmail.com")
    print("METRO_PASS=ton_mot_de_passe")
    raise SystemExit(1)

creds = dict(line.strip().split("=", 1) for line in CREDS_FILE.read_text().splitlines() if "=" in line)
EMAIL = creds["METRO_EMAIL"]
PASSWORD = creds["METRO_PASS"]

# Liste des produits a verifier (URL Metro produit OU requete search)
PRODUITS = [
    # (id, label, type, query)
    ("mousseux",     "Mousseux brut 75cl aro",                   "search", "mousseux brut 75cl"),
    ("soft",         "Cola/Tropic 1.5L MDD",                     "search", "cola 1.5l aro"),
    ("vodka_dela",   "DELAITRE Vodka premium 37.5° 70cl",        "url",    "https://shop.metro.fr/shop/pv/BTY-X839222/0032/0021/DELAITRE-Vodka-premium-37.5%C2%B0-70-cl"),
    ("megaforce",    "Mega Force energy drink 25cl",             "search", "mega force energy"),
    ("cranberry",    "Cranberry 1L MDD",                         "search", "cranberry 1l"),
    ("orange",       "Jus orange 1L MDD",                        "search", "jus orange 1l aro"),
    ("sirop_peche",  "Sirop peche 1L MDD",                       "search", "sirop peche 1l"),
    ("rhum_dela",    "DELAITRE Rhum blanc 70cl",                 "search", "delaitre rhum"),
    ("ananas",       "Jus ananas 1L MDD",                        "search", "jus ananas 1l"),
    ("liqueur_dela", "DELAITRE Liqueur aux plantes 35% 70cl",    "search", "delaitre liqueur plantes"),
    ("tequila_dela", "DELAITRE Tequila Silver 70cl",             "search", "delaitre tequila"),
    ("eau_33cl",     "Eau 33cl aro pack 24",                     "search", "eau 33cl pack 24 aro"),
    ("glacons",      "Sac glacons 2kg",                          "search", "glacons 2kg"),
]

def extract_price(text):
    """Extrait un prix euro depuis du texte."""
    m = re.search(r"(\d+[,.]\d{2})\s*€", text)
    if m:
        return float(m.group(1).replace(",", "."))
    return None

results = []

with sync_playwright() as p:
    # Lance Chrome NON-headless pour passer le WAF (Cloudflare detecte les headless)
    browser = p.chromium.launch(headless=False, slow_mo=300)
    context = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        locale="fr-FR",
    )
    page = context.new_page()

    # Login Metro
    print("Login metro.fr...")
    page.goto("https://shop.metro.fr/login", wait_until="domcontentloaded")
    time.sleep(2)
    try:
        page.fill('input[name="userId"]', EMAIL)
        page.fill('input[name="password"]', PASSWORD)
        page.click('button[type="submit"]')
        page.wait_for_load_state("networkidle", timeout=15000)
        print("Login OK")
    except Exception as e:
        print(f"Login error · vérifie manuellement la fenêtre, appuie Entrée pour continuer apres connexion ·")
        input()

    # Pour chaque produit
    for pid, label, mode, query in PRODUITS:
        print(f"\n>>> {label}")
        try:
            if mode == "url":
                page.goto(query, wait_until="networkidle", timeout=15000)
            else:
                url = f"https://shop.metro.fr/shop/search?q={query.replace(' ', '+')}"
                page.goto(url, wait_until="networkidle", timeout=15000)
            time.sleep(3)
            content = page.content()
            price = extract_price(content)
            print(f"  Prix trouve: {price}€")
            results.append((pid, label, price, page.url))
        except Exception as e:
            print(f"  Erreur: {e}")
            results.append((pid, label, None, ""))

    browser.close()

# Sauvegarde CSV
out = Path("metro_prices.csv")
with out.open("w", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    w.writerow(["id", "label", "prix_ttc", "url"])
    for row in results:
        w.writerow(row)

print(f"\nOK · {out} sauvegarde · colle son contenu dans le chat")
