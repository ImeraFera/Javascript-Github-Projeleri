// global değişkenler
var isaretlenenCevap;


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


// * Her bir seçenek seçildikten sonra sıradaki soruyu ekrana çıkarıyor.
function soruGoster(soruVeCevap) {

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



// * Oyun başladığında ana metod olarak bu metod çalışıyor . 
async function oyunuBaslat() {


    try {
        const sorularVeCevaplari = await sorulariGetir();
        let i = 0;
        isaretlenenCevap = "";

        document.getElementById("oyunBaslatmaBilgisi").setAttribute("hidden", "true");
        document.getElementById("sorularDiv").removeAttribute("hidden");
        document.getElementById("toplamPuan").textContent = "00";

        sureBaslat();

        soruGoster(sorularVeCevaplari[i]);

        document.getElementById("aSikkiATag").addEventListener("click", (event) => {
            event.preventDefault();
            isaretlenenCevap = document.getElementById("aSikki").textContent;

            const dogruMu = isaretlenenDogrumu(sorularVeCevaplari[i].soru_dogruCevap, isaretlenenCevap);
            console.log(sorularVeCevaplari[i].soru_dogruCevap);

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
            console.log(sorularVeCevaplari[i].soru_dogruCevap);

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
            console.log(sorularVeCevaplari[i].soru_dogruCevap);

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
            console.log(sorularVeCevaplari[i].soru_dogruCevap);
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

// * Oyun bittiğinde kullanıcıya bir mesaj gösterip gereken işlemleri yapıyor
function oyunBitti(mesaj) {
    document.getElementById("sorularDiv").setAttribute("hidden", "true");
    alert(mesaj);
    document.getElementById("oyunBaslatmaBilgisi").removeAttribute("hidden");
    document.getElementById("oyunBaslatmaBilgisi").children[0].textContent = "Tekrar Denemek İster Misin ? "

    

}

// * Kişinin seçtiği seçeneğe göre true ya da false dönüyor
function isaretlenenDogrumu(dogruCevap, isaretlenenCevap) {
    if (dogruCevap == isaretlenenCevap) {
        return true;
    } else {
        return false;
    }
}

// * Kişi doğru bildiği her cevap için 10 puan kazanıyor
function puanEkle() {
    const eklenecekPuan = 10;
    const yeniPuan = parseInt(document.getElementById("toplamPuan").textContent) + eklenecekPuan;
    document.getElementById("toplamPuan").textContent = yeniPuan;
}

// * Burada ki metod 5 dakikalık bir süre tutuyor.
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


