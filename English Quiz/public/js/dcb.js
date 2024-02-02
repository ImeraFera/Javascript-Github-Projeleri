
var isaretliCevap = "";
var isaretlenenElement;
// * Soruları veritabanından getirmeye yarayan api
async function sorulariGetir() {
    try {
        const data = await $.ajax({
            url: "/sorulariGetir",
            method: "GET",
            dataType: "json"
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function kalanSure(sure) {

    let dakika = Math.floor(sure / 60);
    let saniye = sure % 60;
    dakika = dakika.toString().padStart(2, '0');
    saniye = saniye.toString().padStart(2, '0');
    document.getElementById("kalanSure").textContent = dakika + ":" + saniye;

    if (sure >= 0) {
        setTimeout(() => {
            document.getElementById("kalanSure").textContent = dakika + ":" + saniye;
            sure -= 1;
            kalanSure(sure);

        }, 1000);
    } else {
        alert("Süreniz Bitti!");
        location.reload();
        return;
    }

}


async function oyunuBaslat() {
    document.getElementById("oyunBaslatmaBilgisi").setAttribute("hidden", "true");
    document.getElementById("sorularDiv").removeAttribute("hidden");

    var i = 0;
    var puan = 0;
    try {
        kalanSure(500);
        let sorular = await sorulariGetir();
        arrayKaristir(sorular);

        soruGetir(sorular[i]);
        const soruNumarasi = document.getElementById("soruNumarasi").childNodes;
        soruNumarasi[3].textContent = "Soru " + (i + 1) + " ( " + sorular[i].soru_kategori + " )";

        const correctOrWrongImg = (src) => {

            const correctImg = document.createElement("img");
            correctImg.src = src;
            correctImg.style.width = "50px";
            return correctImg;

        }

        document.getElementById("next").addEventListener("click", (event) => {
            event.preventDefault();

            if (isaretliCevap == "") {
                alert("Lütfen Doğru Olduğunu Düşündüğünüz Şıkkı İşaretleyiniz!");
                return;
            }

            const imgElement = correctOrWrongImg("/static/images/correct.gif");
            const imgElement2 = correctOrWrongImg("/static/images/wrong.gif");

            if (cevapKontrol(isaretliCevap, sorular[i].soru_dogruCevap)) {
                isaretlenenElement.childNodes[0].firstChild.appendChild(imgElement)
                puan += 10;
                document.getElementById("toplamPuan").textContent = puan;

            }
            else {
                isaretlenenElement.childNodes[0].firstChild.appendChild(imgElement2);

            }

            setTimeout(() => {

                i++;
                if (i < sorular.length) {
                    cevaplariKaldir();
                    soruGetir(sorular[i]);
                } else {
                    document.getElementById("sorularDiv").setAttribute("hidden", "true");
                    alert("Tebrikler, Oyun Bitti ! Puanın = " + document.getElementById("toplamPuan").textContent);
                    location.reload();
                }
                const soruNumarasi = document.getElementById("soruNumarasi").childNodes;
                soruNumarasi[3].textContent = "Soru " + (i + 1) + " ( " + sorular[i].soru_kategori + " )";


            }, 2000);


        })

    } catch (error) {
        console.log(error);
    }

}



function soruGetir(soru) {
    const soruText = document.getElementById("sorulanSoru").childNodes[3];
    soruText.textContent = soru.soru_icerik;
    const cevaplar = [];
    cevaplar.push(soru.soru_yanlisCevap1);
    cevaplar.push(soru.soru_yanlisCevap2);
    cevaplar.push(soru.soru_yanlisCevap3);
    cevaplar.push(soru.soru_dogruCevap);

    arrayKaristir(cevaplar);

    cevaplariGetir(cevaplar[0], "aSikki", "primary", "aSikkiATag");
    cevaplariGetir(cevaplar[1], "bSikki", "warning", "bSikkiATag");
    cevaplariGetir(cevaplar[2], "cSikki", "secondary", "cSikkiATag");
    cevaplariGetir(cevaplar[3], "dSikki", "success", "dSikkiATag");


    document.getElementById("aSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("aSikki").textContent;
        isaretlenenElement = document.getElementById("aSikkiATag");
        isaretle("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("cSikki", "cSikkiATag", "bg-secondary");
        isaretKaldir("dSikki", "dSikkiATag", "bg-success");
    })

    document.getElementById("bSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("bSikki").textContent;
        isaretlenenElement = document.getElementById("bSikkiATag");

        isaretle("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("cSikki", "cSikkiATag", "bg-secondary");
        isaretKaldir("dSikki", "dSikkiATag", "bg-success");

    })
    document.getElementById("cSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("cSikki").textContent;
        isaretlenenElement = document.getElementById("cSikkiATag");

        isaretle("cSikki", "cSikkiATag", "bg-secondary");
        isaretKaldir("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("dSikki", "dSikkiATag", "bg-success");

    })

    document.getElementById("dSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("dSikki").textContent;
        isaretlenenElement = document.getElementById("dSikkiATag");

        isaretle("dSikki", "dSikkiATag", "bg-success");
        isaretKaldir("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("cSikki", "cSikkiATag", "bg-secondary");

    })

}


function cevapKontrol(isaretliCevap, dogruCevap) {
    return (isaretliCevap == dogruCevap) ? true : false;
}



const isaretle = (cevapId, cevapAId, silinenRenk) => {
    document.getElementById(cevapId).parentElement.parentElement.parentElement.classList.remove(silinenRenk);
    document.getElementById(cevapId).parentElement.parentElement.parentElement.classList.add("bg-info");
    document.getElementById(cevapAId).classList.add("disabled");


}

const isaretKaldir = (cevapId, cevapAId, eklenenRenk) => {
    document.getElementById(cevapId).parentElement.parentElement.parentElement.classList.add(eklenenRenk);
    document.getElementById(cevapId).parentElement.parentElement.parentElement.classList.remove("bg-info");
    document.getElementById(cevapAId).classList.remove("disabled");
}

function arrayKaristir(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

function cevaplariKaldir() {

    const siklar = document.getElementById("siklar");

    if (siklar.hasChildNodes()) {

        while (siklar.firstChild) {
            siklar.removeChild(siklar.firstChild);
        }
    }
}

function cevaplariGetir(cevapIcerik, cevapId, cevapRenk, aTagId) {



    const li = document.createElement("li");
    li.className = "list-group-item  mt-2 bg-" + cevapRenk;
    const a = document.createElement("a");
    a.className = "nav-link";
    a.id = aTagId;
    a.href = "";
    const divCard = document.createElement("div");
    divCard.className = "card d-grid gap-2 bg-" + cevapRenk;
    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body text-white fw-bold";
    divCardBody.id = cevapId;
    divCardBody.textContent = cevapIcerik;

    li.appendChild(a);
    a.appendChild(divCard);
    divCard.appendChild(divCardBody);
    document.getElementById("siklar").appendChild(li);

}

