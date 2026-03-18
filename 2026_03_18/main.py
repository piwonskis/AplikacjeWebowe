# 4.1
# with open("sygnaly.txt", "r") as f:
#     slowa = [linia.strip() for linia in f]
#     wynik = ""
#     for i in range(39, len(slowa), 40):
#         slowo = slowa[i]
#         wynik += slowo[9]
#f.close()
# print(wynik)

#4.2
# with open("sygnaly.txt", "r") as f:
#     slowa = [linia.strip() for linia in f]
#
# max_roznych = 0
# najlepsze_slowo = ""
# for slowo in slowa:
#     rozne_litery = len(set(slowo))
#
#     if rozne_litery > max_roznych:
#         max_roznych = rozne_litery
#         najlepsze_slowo = slowo
#f.close()
# print(najlepsze_slowo, max_roznych)
#

#4.3
with open("sygnaly.txt", "r") as f:
    litery = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","W","Y","Z"]
    for x in f:
        for i in range(len(x)):
            for j in litery:


f.close()