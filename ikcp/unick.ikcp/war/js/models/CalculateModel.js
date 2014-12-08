/**
 * Objects used in service.js
 * Created by Peter Cervienka on 8.12.2014.
 */

function skupina_rizika( modelData ) {
    if ( modelData.kod )
        this.kod = modelData.kod;

    if ( modelData.predmet )
        this.predmet = modelData.predmet;

    if ( modelData.percento )
    this.percento = modelData.percento;

    if ( modelData.suma )
        this.suma = modelData.suma;
}

function person( modelData ) {

    if ( modelData.id )
        this.id = modelData.id;

    if ( modelData.vek )
        this.vek = modelData.vek;

    if ( modelData.skupina )
        this.skupina = modelData.skupina;

    if ( modelData.zlava_osoba )
        this.zlava_osoba = modelData.zlava_osoba;

    if ( modelData.skupiny_rizik )
        this.skupiny_rizik = modelData.skupiny_rizik;
}
