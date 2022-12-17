#web scraping and extracting pdf files
import requests
import ssl
ssl._create_default_https_context=ssl._create_unverified_context
from bs4 import BeautifulSoup
import io
from PyPDF2 import PdfFileReader
url="https://web.whatsapp.com/"
read=requests.get(url)
html_content=read.content
soup=BeautifulSoup(html_content,"html.parser")
list_of_pdf=set()
l=soup.find_all('p')
for pe in l:
    p=pe.find_all('a')
    for link in p:
         print("links: ", link.get('href'))
         print("\n")
         pdf_link = (link.get('href')[:-5]) + ".pdf"
         print(pdf_link)
         print("\n")
         list_of_pdf.add(pdf_link)
