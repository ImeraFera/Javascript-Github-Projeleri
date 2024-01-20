let sorularVeCevaplar;
var isaretlenenCevap;

async function sorulariGetir() {
    try {
        const data = await $.ajax({
            url: "/sorulariGetir",
            method: "GET",
            dataType: "json"
        });
        console.log("Data =", data);
        sorularVeCevaplar = data;
        return sorularVeCevaplar;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function soruGoster(soruVeCevap) {

    console.log(soruVeCevap.soru_icerik);

    document.getElementById("sorulanSoru").textContent = soruVeCevap.soru_icerik;

    const siklar = ["aSikki", "bSikki", "cSikki", "dSikki"];
    const dogruCevapSikki = Math.floor(Math.random() * 4);
    let yanlisSiklar = [];
    document.getElementById(siklar[dogruCevapSikki]).textContent = soruVeCevap.soru_dogruCevap;

    for (let i = 0; i < siklar.length; i++) {

        if (siklar[i] == siklar[dogruCevapSikki])
            continue;
        else
            yanlisSiklar.push(siklar[i]);
    }

    document.getElementById(yanlisSiklar[0]).textContent = soruVeCevap.soru_yanlisCevap1;
    document.getElementById(yanlisSiklar[1]).textContent = soruVeCevap.soru_yanlisCevap3;
    document.getElementById(yanlisSiklar[2]).textContent = soruVeCevap.soru_yanlisCevap2;

}



async function oyunuBaslat() {
    try {
        const sorularVeCevaplari = await sorulariGetir();
        let i = 0;
        document.getElementById("oyunBaslatmaBilgisi").setAttribute("hidden", "true");
        document.getElementById("sorularDiv").removeAttribute("hidden");

        sureBaslat();

        soruGoster(sorularVeCevaplari[i]);

        document.getElementById("aSikkiATag").addEventListener("click", (event) => {
            event.preventDefault();
            isaretlenenCevap = document.getElementById("aSikki").textContent;

            const dogruMu = isaretlenenDogrumu(sorularVeCevaplari[i].soru_dogruCevap, isaretlenenCevap);

            if (dogruMu) {
                console.log("dogru cevap");
                puanEkle();

            } else {
                console.log("yanlis cevap");
            }

            i++;
            if (i < sorularVeCevaplari.length && document.getElementById("kalanSure").textContent != 'Süre doldu!') {
                soruGoster(sorularVeCevaplari[i]);
            }
            else if (i >= sorularVeCevaplari.length) {
                oyunBitti("Tebrikler! Tüm Soruları Cevapladın. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            } else {
                oyunBitti("Maalesef Süren Bitti. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            }

        })
        document.getElementById("bSikkiATag").addEventListener("click", (event) => {
            event.preventDefault();
            isaretlenenCevap = document.getElementById("bSikki").textContent;
            const dogruMu = isaretlenenDogrumu(sorularVeCevaplari[i].soru_dogruCevap, isaretlenenCevap);

            if (dogruMu) {
                console.log("dogru cevap");
                puanEkle();

            } else {
                console.log("yanlis cevap");
            }

            i++;
            if (i < sorularVeCevaplari.length && document.getElementById("kalanSure").textContent != 'Süre doldu!') {
                soruGoster(sorularVeCevaplari[i]);
            }
            else if (i >= sorularVeCevaplari.length) {
                oyunBitti("Tebrikler! Tüm Soruları Cevapladın. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            } else {
                oyunBitti("Maalesef Süren Bitti. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            }
        })
        document.getElementById("cSikkiATag").addEventListener("click", (event) => {
            event.preventDefault();
            isaretlenenCevap = document.getElementById("cSikki").textContent;
            const dogruMu = isaretlenenDogrumu(sorularVeCevaplari[i].soru_dogruCevap, isaretlenenCevap);

            if (dogruMu) {
                console.log("dogru cevap");
                puanEkle();

            } else {
                console.log("yanlis cevap");
            }

            i++;
            if (i < sorularVeCevaplari.length && document.getElementById("kalanSure").textContent != 'Süre doldu!') {
                soruGoster(sorularVeCevaplari[i]);
            }
            else if (i >= sorularVeCevaplari.length) {
                oyunBitti("Tebrikler! Tüm Soruları Cevapladın. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            } else {
                oyunBitti("Maalesef Süren Bitti. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            }
        })
        document.getElementById("dSikkiATag").addEventListener("click", (event) => {
            event.preventDefault();
            isaretlenenCevap = document.getElementById("dSikki").textContent;
            const dogruMu = isaretlenenDogrumu(sorularVeCevaplari[i].soru_dogruCevap, isaretlenenCevap);

            if (dogruMu) {
                console.log("dogru cevap");
                puanEkle();

            } else {
                console.log("yanlis cevap");
            }

            i++;
            if (i < sorularVeCevaplari.length && document.getElementById("kalanSure").textContent != 'Süre doldu!') {
                soruGoster(sorularVeCevaplari[i]);
            }
            else if (i >= sorularVeCevaplari.length) {
                oyunBitti("Tebrikler! Tüm Soruları Cevapladın. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            } else {
                oyunBitti("Maalesef Süren Bitti. Toplam Puanın = " + document.getElementById("toplamPuan").textContent)
            }
        })

    } catch (error) {
        console.error(error);
    }
}


function oyunBitti(mesaj) {
document.getElementById("sorularDiv").setAttribute("hidden", "true");
alert(mesaj);

}


function isaretlenenDogrumu(dogruCevap, isaretlenenCevap) {
    if (dogruCevap == isaretlenenCevap) {
        return true;
    } else {
        return false;
    }
}

function puanEkle() {
    const eklenecekPuan = 10;
    const yeniPuan = parseInt(document.getElementById("toplamPuan").textContent) + eklenecekPuan;
    document.getElementById("toplamPuan").textContent = yeniPuan;
}


function sureBaslat() {
    const sure = 5 * 60;

    let sureSayac = sure;

    function updateSure() {
        const dakika = Math.floor(sureSayac / 60);
        const saniye = sureSayac % 60;

        document.getElementById("kalanSure").textContent = `${dakika}:${saniye < 10 ? '0' : ''}${saniye}`;

        sureSayac--;

        if (sureSayac >= 0) {
            setTimeout(updateSure, 1000);
        } else {
            document.getElementById("kalanSure").textContent = 'Süre doldu!';
        }
    }

    updateSure();
}


