document.addEventListener('DOMContentLoaded', function(){

    // ------ Const ------ //
    const nameRace = document.getElementById('nameRace')
    const countryRace = document.getElementById('countryRace')
    const durationRace = document.getElementById('durationRace')
    const beginInscription = document.getElementById('beginInscription')
    const infosRace = {}
    const mainDiv = document.getElementById('mainDiv')
    const choiceAnimals = document.getElementById('choiceAnimals')
    const participants = document.getElementById('participants')


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
    let checkFill = setInterval(checkFillInscription, 1000)
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
    const rowPlayer = document.getElementById('rowPlayer')
    let allPlayers = []
    participants.onchange = addToInscription
    function addToInscription(){

        const tbodyPlayer = document.getElementById('tbodyPlayer')
        const currentPlayer = allDatasAnimals.find(currentPlayer => currentPlayer.idA === participants.value)
        allPlayers.push(currentPlayer)
        const toDisabled = participants.selectedIndex
        participants.options[toDisabled].setAttribute('disabled', 'disabled')

        // --- Create tr & his elements --- //
        const clonedRowPlayer = rowPlayer.cloneNode()

        const tdBtn = document.createElement('td')
        const tdBtnSupp = document.createElement('button')
              tdBtnSupp.textContent = 'Supprimer'
              tdBtnSupp.classList = 'btn btn-primary'
        const tdIdA = document.createElement('td')
        const tdNomA = document.createElement('td')
        const tdNatA = document.createElement('td')
        const tdDescA = document.createElement('td')

        tdBtn.append(tdBtnSupp)
        tdIdA.append(currentPlayer.idA)
        tdNomA.append(currentPlayer.nomA)
        tdNatA.append(currentPlayer.nationA)
        tdDescA.append(currentPlayer.descA)

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

    }





})