import React, { Component } from 'react'

export default class ImprintContent extends Component{
  
  state = { open: false };
  close = () => this.setState({ open: false });

  render() {

    return(
      <div>
        <div>
          <p>
            <strong>Hasso-Plattner-Institut für Digital Engineering gGmbH</strong><br/>
            Prof.-Dr.-Helmert-Str. 2-3<br/>
            14482 Potsdam<br/>
            Telefon: +49 (0)331 / 5509-0<br/>
            Telefax: +49 (0)331 / 5509-129<br/>
            E-Mail: 
              <a href="javascript:linkTo_UnCryptMailto('nbjmup+iqj.jogpAiqj\/ef');"
                title="Öffnet ein Fenster zum Versenden der E-Mail"
                className="mail">
                  <span>hpi-info(at)hpi.de</span>
              </a><br/>
            Internet: 
              <a href="/" title="Öffnet internen Link im aktuellen Fenster" className="internal">
                <span>www.hpi.de</span>
              </a>
          </p>
          <p>
            <strong>Vertretungsberechtigte Geschäftsführer: </strong><br/>
            Prof. Dr. Christoph Meinel<br/>
            Registergericht: Amtsgericht Potsdam<br/>
            Registernummer: HRB 12184
          </p>
          <p>
            Inhaltlich Verantwortliche gemäß § 6 MDStV:<br/>
            Prof. Dr. Emmanuel Müller und Dr. Davide Mottin
          </p>
          <p>
            <strong>Rechtliche Hinweise:<br/></strong>
            Das Hasso-Plattner-Institut (HPI) überprüft und
            aktualisiert regelmäßig die Inhalte seiner Websites. Trotz größtmöglicher Sorgfalt können wir
            nicht ausschließen, dass einzelne Informationen auf unseren Seiten veraltet oder nicht
            zutreffend sind. Daher können wir keine Haftung für Aktualität, Genauigkeit und Vollständigkeit
            der publizierten Informationen übernehmen. Das gleiche gilt für alle Websites, die von den
            HPI-Seiten über Hyperlinks erreichbar sind. Für alle diese Links gilt: Wir erklären
            ausdrücklich, dass wir keinen Einfluss auf die Gestaltung und die Inhalte der verlinkten Seite
            haben. Deshalb distanzieren wir uns hiermit ausdrücklich von allen Inhalten aller verlinkten
            Seiten und machen uns ihre Inhalte nicht zu Eigen. Diese Erklärung gilt für alle auf unserer
            Seite angebrachten Links zu fremden Seiten. Für den Inhalt dieser verlinkten Seiten ist das HPI
            nicht verantwortlich. Weiterhin behält sich das HPI jederzeit Änderungen und Ergänzungen der
            angezeigten Informationen vor. Inhalt und Struktur der HPI-Website sind durch das Copyright
            geschützt. Die Weiterverwendung von Informationen und Daten, vor allem die Verwendung von Texten
            und Illustrationen ist nur nach unserer Zustimmung zulässig.
          </p>
          <p>
            <strong>Datenschutzerklärung:</strong><br/>
            Hinweise zum Datenschutz entnehmen Sie bitte 
            <a href="/datenschutz.html" title="Öffnet internen Link im aktuellen Fenster" className="internal">
              <span> folgender Seite</span>
            </a>.
          </p>
        </div>
      </div>
    );

  }
}
