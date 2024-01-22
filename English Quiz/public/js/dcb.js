
var isaretliCevap = "";
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


async function oyunuBaslat() {
    document.getElementById("oyunBaslatmaBilgisi").setAttribute("hidden", "true");
    document.getElementById("sorularDiv").removeAttribute("hidden");


    try {

        const sorular = await sorulariGetir();
        soruGetir(sorular[0]);
        cevapIsaretle();


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

    cevaplariKaristir(cevaplar);

    cevaplariGetir(cevaplar[0], "aSikki", "primary", "aSikkiATag");
    cevaplariGetir(cevaplar[1], "bSikki", "warning", "bSikkiATag");
    cevaplariGetir(cevaplar[2], "cSikki", "secondary", "cSikkiATag");
    cevaplariGetir(cevaplar[3], "dSikki", "success", "dSikkiATag");



}

function cevapKontrol(isaretliCevap, dogruCevap) {
    return (isaretliCevap == dogruCevap) ? true : false;
}

function cevapIsaretle() {

    const isaretle = (cevapId, cevapAId, silinenRenk) => {
        document.getElementById(cevapId).parentElement.classList.remove(silinenRenk);
        document.getElementById(cevapId).parentElement.classList.add("bg-info");
        document.getElementById(cevapAId).classList.add("disabled");
    }

    const isaretKaldir = (cevapId, cevapAId, eklenenRenk) => {
        document.getElementById(cevapId).parentElement.classList.add(eklenenRenk);
        document.getElementById(cevapId).parentElement.classList.remove("bg-info");
        document.getElementById(cevapAId).classList.remove("disabled");
    }

    document.getElementById("aSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("aSikki").textContent;
        isaretle("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("cSikki", "cSikkiATag", "bg-secondary");
        isaretKaldir("dSikki", "dSikkiATag", "bg-success");
        console.log(isaretliCevap);
    })
    document.getElementById("bSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("bSikki").textContent;
        isaretle("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("cSikki", "cSikkiATag", "bg-secondary");
        isaretKaldir("dSikki", "dSikkiATag", "bg-success");
        console.log(isaretliCevap);

    })
    document.getElementById("cSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("cSikki").textContent;
        isaretle("cSikki", "cSikkiATag", "bg-secondary");
        isaretKaldir("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("dSikki", "dSikkiATag", "bg-success");
        console.log(isaretliCevap);

    })
    document.getElementById("dSikkiATag").addEventListener("click", (event) => {
        event.preventDefault();
        isaretliCevap = document.getElementById("dSikki").textContent;
        isaretle("dSikki", "dSikkiATag", "bg-success");
        isaretKaldir("aSikki", "aSikkiATag", "bg-primary");
        isaretKaldir("bSikki", "bSikkiATag", "bg-warning");
        isaretKaldir("cSikki", "cSikkiATag", "bg-secondary");
        console.log(isaretliCevap);

    })


}

function cevaplariKaristir(cevaplar) {

    for (let i = cevaplar.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = cevaplar[i];
        cevaplar[i] = cevaplar[j];
        cevaplar[j] = temp;
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

