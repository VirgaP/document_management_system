import React, { Component } from 'react';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;


export class InstructionsAdmin extends Component {
     callback(key) {
        console.log(key);
      }
  render() {
    return (
      <section>
      <div className="container" id="instructions-container">
      <h4>Dokumentų valdymo sistemos instrukcija</h4>
      <p>Administratoriaus atmintinė</p>
        <Collapse id="accordion" onChange={this.callback}>
        <Panel header="Vartotojai" key="1">
            <p>Administratoriaus ir vartotojo sukūrimas.<br></br>
            Pradedant darbą su AbraKadabra dokumentų valdymo sistema būtina sukurti administratorių.
            Administratoriaus paskyroje iš meniu pasirinkite mygtuką NAUJAS VARTOTOJAS. Būtina užpildyti visas lentelės grafas.Paspauskite SAUGOTI.
             Naujas vartotojas - sukurtas. Pasirinkus laukelį "Admin" sukurtam varottoju bus priskirtos administratoriaus teisės. </p>
        </Panel>
        <Panel header="Administratoriaus teisės" key="2">
            <p>Sistemos vartotojus kuria ir informaciją redaguoja tik administratorius.<br></br>
            Administratorius gali peržiūrėti visus sukurtus sistemoje dokumentus bei vartotojus, gali trinti sukurtus vartotojus.<br></br>
            Administratorius gali kurti, trinti ir redaguoti vartotojų grupes. Priskirti vartotojus grupėms.<br></br>
            Administratorius gali kurti, trinti ir redaguoti dokumentų tipus.</p> 
        </Panel>
        <Panel header="Varotojų grupės ir dokumento tipai" key="3">
            <p>Administratoriaus paskyroje meniu pasirinkite mygtuką GRUPĖS -> Kurti naują grupę. Suveskite grupės pavadinimą. Paspauskite SAUGOTI. Nauja grupė sukurta.<br></br>
            Administratoriaus paskyroje meniu pasirinkite mygtuką Dokumento tipai -> Kurti dokumento tipą. Įveskite dokumento tipo pavadinimą. Paspauskite SAUGOTI. Dokumento tipas sukurtas.<br></br>
            Priskirti dokumento tipą grupei -  meniu pasirinkite mygtuką Dokumento tipai -> Dokumentų tipai. Pasireinkite tipą "Peržiūrėti" </p>
        </Panel>
      </Collapse>
      </div>
      </section>
    )
  }
}

export default InstructionsAdmin
