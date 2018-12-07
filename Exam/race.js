document.addEventListener('DOMContentLoaded', function(){

    // ------ Const ------ //
    const alertMessage = document.getElementById('alertMessage')
    const nameRace = document.getElementById('nameRace')
    const countryRace = document.getElementById('countryRace')
    const durationRace = document.getElementById('durationRace')
    const beginInscription = document.getElementById('beginInscription')
    const infosRace = {}
    const mainDiv = document.getElementById('mainDiv')
    const choiceAnimals = document.getElementById('choiceAnimals')
    const participants = document.getElementById('participants')
    const rowPlayer = document.getElementById('rowPlayer')
    const tbodyPlayer = document.getElementById('tbodyPlayer')
    const btnCloseInscription = document.getElementById('closeInscription')
    const participantsTable = document.getElementById('participantsTable')
    const raceTable = document.getElementById('raceTable')


    // --- Hide some elements --- //
    participantsTable.hidden = true
    raceTable.hidden = true

    // ------ We fill the countries ------ //
    beginInscription.disabled = true
    country()
    function country(){
        fetch('./rqListePays.php')
            .then(res => res.json())
            .then(datas => {
                for(data of datas){
                    let option = document.createElement('option')
                    option.append(data.nomP)
                    countryRace.append(option)
                }
            })
    }

    // ------ Fill the animals ------ //
    let allDatasAnimals = []
    function selectAnimals(){
        fetch('./rqListeAnimaux.php')
            .then(res => res.json())
            .then(datas => {
                for(data of datas){
                    allDatasAnimals = datas
                    let option = document.createElement('option')
                    option.append(data.nomA)
                    option.value = data.idA
                    participants.append(option)

                }
            })
    }

    // ------ Check fill infos ------ //
    let checkFill = setInterval(checkFillInscription, 500)
    function checkFillInscription() {
        const durationR =  parseInt(durationRace.value)
        if((nameRace.value !== '') && (durationR >= 1)) {
            clearInterval(checkFill)
            beginInscription.disabled = false
        }
    }

    // ------ Inscription ------ //
    beginInscription.onclick = () => {
        inscription(event)
        participantsTable.hidden = false

    }
    function inscription(event){
        event.preventDefault()
        //--- lock duration,name,country ---//
        nameRace.disabled = true
        countryRace.disabled = true
        durationRace.disabled = true
        beginInscription.remove()

        // --- Create object with race's infos --- //
        infosRace.name = nameRace.value
        infosRace.duration = '2000ms'
        infosRace.pays = countryRace.value

        // --- Fill & Call choiceAnimals --- //
        selectAnimals()
        durationRace.after = choiceAnimals
        choiceAnimals.hidden = false
    }

    // ------ Add animals to inscription ------ //
    let toDisabled;
    let allPlayers = []
    let btnSupIns
    participants.onchange = addToInscription
    function addToInscription(){

        // --- Find the correspond player --- //
        const currentPlayer = allDatasAnimals.find(currentPlayer => currentPlayer.idA === participants.value)
        allPlayers.push(currentPlayer)

        // --- Disabled animals already selected --- //
        toDisabled = participants.selectedIndex
        participants.options[toDisabled].setAttribute('disabled', 'disabled')

        // --- Create tr & his elements --- //
        const clonedRowPlayer = rowPlayer.cloneNode()
        const tdBtn = document.createElement('td')
        const tdIdA = document.createElement('td')
        const tdNomA = document.createElement('td')
        const tdNatA = document.createElement('td')
        const tdDescA = document.createElement('td')

        // --- Delete btn --- //
        const tdBtnSupp = document.createElement('button')
              tdBtnSupp.textContent = 'Supprimer'
              tdBtnSupp.id = currentPlayer.idA
              tdBtnSupp.value = toDisabled
              tdBtnSupp.type = 'button'
              tdBtnSupp.classList = 'btn btn-primary deleteFromInscription'

        // --- Create tds elements --- //
        tdBtn.append(tdBtnSupp)
        tdIdA.append(currentPlayer.idA)
        tdNomA.append(currentPlayer.nomA)
        tdNatA.append(currentPlayer.nationA)
        tdDescA.append(currentPlayer.descA)

        // --- Append every tds--- //
        clonedRowPlayer.append(tdBtn)
        clonedRowPlayer.append(tdIdA)
        clonedRowPlayer.append(tdNomA)
        clonedRowPlayer.append(tdNatA)
        clonedRowPlayer.append(tdDescA)

        // --- Add the row at the table tbody --- //
        tbodyPlayer.append(clonedRowPlayer)

        // --- Change the default selected element --- //
        participants.options[0].setAttribute('selected', 'selected')
        participants.options[0].removeAttribute('selected', 'selected')
        btnSupIns = document.getElementById(currentPlayer.idA)
        btnSupIns.onclick = deleteFromInscription
    }

    // ------ Delete from inscription ------ //
    function deleteFromInscription(){
        this.parentElement.parentElement.remove()
        participants.options[this.value].removeAttribute('disabled')
    }

    // ------ Close the inscription ------ //
    btnCloseInscription.onclick = () => {
        if( allPlayers.length < 1){
            alertMessage.parentElement.removeAttribute('hidden');
        } else {
            alertMessage.parentElement.setAttribute('hidden', 'hidden')
            closeInscription()
        }
    }
    function closeInscription(){
        // --- Hide the participant's table && btn close --- //
        participantsTable.hidden = true
        choiceAnimals.hidden = true
        raceTable.hidden = false
    }

    // ------ Chrono ------ //
    const basicAddon1 = document.getElementById('basic-addon1')
    basicAddon1.onclick = () => {
        chrono()
    }
    function chrono(){
        console.log('start')
    }




})