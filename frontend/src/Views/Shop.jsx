import React from 'react'
import ItemRow from '../Components/ItemRow'

const Shop = () => {
  const allItems = [
    {
      id: 3,
      name: 'Lihalaatikko',
      image: '/hero.jpg',
      price: '29.99',
      description: `Lihalaatikko on lihaa arvostavan valinta: se sisältää tarkoin valikoituja, tuoreita suomalaisia lihatuotteita, kuten naudan, porsaan ja kanan parhaita paloja luotettavilta kotimaisilta tuottajilta. Laatikko tekee arjesta helpompaa ja ruokailusta laadukkaampaa – ilman turhia lisäaineita, suoraan kotiovelle toimitettuna, valmiina kokattavaksi tai pakastettavaksi.`,
      orders: 50,
    },
    {
      id: 4,
      name: 'Sekalaatikko',
      image: '/hero.jpg',
      price: '24.99',
      description: 'Sekasyöjälaatikko tarjoaa laajan valikoiman tuoreita ja puhtaita raaka-aineita, jotka yhdistävät niin kotimaisia liha- kuin kasvisvaihtoehtoja. Laatikoista löydät nautittavaa niin lihansyöjille kuin kasviksia ja proteiinia arvostaville, aina vastuullisesti tuotettuna ja ilman turhia lisäaineita. Suoraan kotiovelle toimitettuna, tämä laatikko tuo arkeesi maukasta ja ravitsevaa ruokaa, joka sopii monenlaisiin makuihin ja ruokailutottumuksiin.',
      orders: 75,
    },
    {
      id: 5,
      name: 'Kasvislaatikko',
      image: '/hero.jpg',
      price: '19.99',
      description: 'Kasvissyöjälaatikko tarjoaa herkullisen valikoiman tuoreita ja puhtaita kasvisraaka-aineita, kuten vihanneksia, juureksia, viljoja ja proteiinirikkaita kasvipohjaisia tuotteita, jotka tulevat luotettavilta kotimaisilta tuottajilta. Laatikko tuo arkeesi maukkaita ja monipuolisia kasvisruokia ilman lisäaineita, suoraan kotiovelle toimitettuna. Täydellinen valinta, jos arvostat kasvisruokaa, joka on täynnä makua ja ravinteita.',
      orders: 30,
    },
    {
      id: 2,
      name: 'Vegaanilaatikko',
      image: '/hero.jpg',
      price: '21.99',
      description: 'Vegaanilaatikko tarjoaa monipuolisen valikoiman tuoreita ja puhtaita vegaanisia raaka-aineita, kuten proteiinirikkaita palkokasveja, vihanneksia ja kasvipohjaisia vaihtoehtoja, jotka tulevat luotettavilta kotimaisilta tuottajilta. Laatikko tuo arkeen herkullista ja ravitsevaa kasvisruokaa, ilman lisäaineita, suoraan kotiovelle toimitettuna. Täydellinen valinta, jos arvostat vastuullisia ja vegaanisia vaihtoehtoja ruokapöydässäsi.',
      orders: 123,
    }
  ]

  return (
    <div className="shop-page">
        <div className="relative">
          <img
            src="/hero-blur.jpg"
            alt="Shop Hero"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 text-center px-4">
            <h1 className="text-white text-4xl font-[header] mb-4 ">Tee arjestasi helppoa &#8212; Tilaa tänään!</h1>
            <p className="text-white text-lg">
            Kotilaatikon tilaaminen tekee arjesta helpompaa. Et tarvitse enää huolehtia ruokalistan suunnittelusta tai kaupasta raahaamisesta – saat kaiken valmiiksi toimitettuna. Näin voit nauttia maukkaasta ruoasta ilman turhaa vaivannäköä!
            </p>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4">
          <div className="recommended-section my-8">
            <h2 className="text-2xl font-[header] mb-4">Suosituin kotilaatikko</h2>
            <div className="rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row relative bg-gray-100 hover:scale-102 transition-transform duration-300">
              <div className="absolute top-0 left-0 bg-[var(--primary-color)] text-white text-sm font-bold px-3 py-1 rounded-br-lg">
                TILATUIN !
              </div>
              <img
                src={allItems[3].image}
                alt={allItems[3].name}
                className="w-full sm:w-1/3 h-[300px] object-cover"
              />
              <div className="p-6 flex flex-col justify-between flex-grow relative">
                <div>
                  <h3 className="text-2xl font-[header] mb-2">{allItems[3].name}</h3>
                  <p className="text-gray-600 mb-4">{allItems[3].description}</p>
                  <p className="text-[var(--primary-color)] font-bold text-2xl">
                    {allItems[3].price} &#8364;
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-4">
                  <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-opacity-90 hover:scale-105 transition-transform duration-200 font-bold">
                    Tilaa
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 hover:scale-105 transition-transform duration-200 font-bold">
                    Lue lisää...
                  </button>
                </div>
              </div>
          </div>
        </div>
        <ItemRow allItems={allItems} />
      </div>
    </div>
  )
}



export default Shop
