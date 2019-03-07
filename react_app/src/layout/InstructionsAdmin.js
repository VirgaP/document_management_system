import React, { Component } from 'react'

export class InstructionsAdmin extends Component {
  render() {
    return (
      
        <ul id="accordion">
    <li>
        <h2>Vartotojai</h2>
        <div class="content">
        <p>Administratoriaus ir vartotojo sukūrimas</p>
        <p>Pradedant darbą su AbraKadabra dokumentų valdymo sistema būtina sukurti administratorių.</p>
        <p>Administratoriaus paskyroje iš meniu pasirinkite mygtuką NAUJAS VARTOTOJAS. Būtina užpildyti visas lentelės grafas.Paspauskite SAUGOTI.
             Naujas vartotojas - sukurtas. Pasirinkus laukelį "Admin" sukurtam varottoju bus priskirtos administratoriaus teisės. 
        </p>
        </div>
    </li>
    <li>
        <h2>Administratoriaus teisės:</h2>
        <div class="content">
        <p>Sistemos vartotojus kuria tik administratorius.</p>
        <p>Sistemos vartotojų informaciją redaguoja tik administratorius.</p>
        <p>Adminitratorius gali peržiūrėti visus sukurtus sistemoje dokumentus bei vartotojus.</p>  
        <p>Administratorius gali trinti sukurtus vartotojus.</p> 
        <p>Administratorius gali kurti, trinti ir redaguoti vartotojų grupes. Priskirti vartotojus grupėms.</p> 
        <p>Administratorius gali kurti, trinti ir redaguoti dokumentų tipus.</p> 
        </div>
    </li>
    <li>
        <h2>Varotojų grupės sukūrimas</h2>
        <div class="content">
           <p>Administratoriaus paskyroje meniu pasirinkite mygtuką GRUPĖS -> Kurti naują grupę. Suveskite grupės pavadinimą. Paspauskite SAUGOTI. Nauja grupė sukurta.</p>
        </div>
    </li>
    <li>
        <h2>Dokumentų tipo sukūrimas</h2>
        <div class="content">
        <p>Administratoriaus paskyroje meniu pasirinkite mygtuką Dokumento tipai -> Kurti dokumento tipą. Įveskite dokumento tipo pavadinimą. Paspauskite SAUGOTI. Dokumento tipas sukurtas.</p>
        <p>Priskirti dokumento tipą grupei -  meniu pasirinkite mygtuką Dokumento tipai -> Dokumentų tipai. Pasireinkite tipą "Peržiūrėti" </p>
        </div>
    </li>
</ul>
   
    )
  }
}

export default InstructionsAdmin
