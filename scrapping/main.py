from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

import json

FA_SEARCH_URL = "https://fontawesome.com/search?o=a&m=free&s=solid"
FA_CAT_URL = FA_SEARCH_URL+"&c={id}"

def tokenize_title(title):
    if title == "Disaster + Crisis":
        return "disaster"
    
    if title == "Genders":
        return "gender"

    title = title.lower()
    title = title.replace(" + ", "-")
    title = title.replace(" ", "-")

    return title

def main():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(options=options)
    driver.get(FA_SEARCH_URL)

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "wrap-icons-facet-input")))

    soup = BeautifulSoup(driver.page_source, "html.parser")

    categories = soup.find("div",{"class":"wrap-icons-facets-menu"}).find("ul",{"class":"icons-facets-group-categories"}).find_all("li",{"class":"wrap-icons-facet-input"})

    cat_list = [cat.find("span",{"class":"text-capitalize"}).string for cat in categories]

    icon_list = {
        tokenize_title(cat):{
            "title": cat,
            "list": []
        }
        for cat in cat_list
    }

    for count, cat in enumerate(cat_list):
        icon_token = tokenize_title(cat)
        driver.get(FA_CAT_URL.format(id=icon_token))
        print(f"Accessing {icon_token} page ({count+1}/{len(cat_list)})")
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME, "wrap-icon")))
        soup = BeautifulSoup(driver.page_source, "html.parser")
        icons = soup.find_all("article",{"class":"wrap-icon"})
        icon_list[icon_token]["list"] = [{"name": icon.find("span",{"class":"icon-name"}).string} for icon in icons]


    driver.quit()
    
    with open('iconList.json', 'w') as fp:
        json.dump(icon_list, fp)


if __name__ == "__main__":
    main()