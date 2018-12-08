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
    const startTimer = document.getElementById('startTimer')
    const rowRacePlayer = document.getElementById('rowRacePlayer')
    const remainingTimer = document.getElementById('remainingTimer')

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
        let heures = parseInt(durationRace.value.split(':')[0])
        let minutes = parseInt(durationRace.value.split(':')[1])
        let secondes = parseInt(durationRace.value.split(':')[2])
        if((secondes >= 1) || (minutes >= 1) || (heures >= 1)) {
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
    let currentPlayer
    participants.onchange = addToInscription
    function addToInscription(){
        // --- Find the correspond player --- //
        currentPlayer = allDatasAnimals.find(currentPlayer => currentPlayer.idA === participants.value)
        allPlayers.push(currentPlayer)

        // --- Disabled animals already selected --- //
        toDisabled = participants.selectedIndex
        participants.options[toDisabled].setAttribute('disabled', 'disabled')

        // --- Create tr & td elements --- //
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

        // --- Fill tds elements --- //
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
    // Ne supprime pas après avoir été enlevé
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
        choiceAnimals.hidden = true
        participantsTable.hidden = true
        raceTable.hidden = false
        remainingTimer.value = durationRace.value
        // ------ Fill Race table ------ //
        for(player of allPlayers){
            fillRaceTable()
        }
    }

    function fillRaceTable(){
        // --- Create tr & td elements --- //
        const clonedRowRacePlayer = rowRacePlayer.cloneNode()
        const raceTdBtnStop = document.createElement('td')
        const raceTdBtnLoose = document.createElement('td')
        const raceTdIdA = document.createElement('td')
        const raceTdNomA = document.createElement('td')
        const raceTdNatA = document.createElement('td')
        const raceTdDescA = document.createElement('td')

        // --- stop & loose btn --- //
        const raceBtnStop = document.createElement('button')
            raceBtnStop.textContent = 'Stop'
            raceBtnStop.type = 'button'
            raceBtnStop.classList = 'btn btn-primary'
        const raceBtnLoose = document.createElement('button')
            raceBtnLoose.textContent = 'Abandon'
            raceBtnLoose.type = 'button'
            raceBtnLoose.classList = 'btn btn-primary'

        // --- Fill tds elements --- //
        raceTdBtnStop.append(raceBtnStop)
        raceTdBtnLoose.append(raceBtnLoose)
        raceTdIdA.append(player.idA)
        raceTdNomA.append(player.nomA)
        raceTdNatA.append(player.nationA)
        raceTdDescA.append(player.descA)

        // --- Append every tds--- //
        clonedRowRacePlayer.append(raceTdBtnStop)
        clonedRowRacePlayer.append(raceTdBtnLoose)
        clonedRowRacePlayer.append(raceTdIdA)
        clonedRowRacePlayer.append(raceTdNomA)
        clonedRowRacePlayer.append(raceTdNatA)
        clonedRowRacePlayer.append(raceTdDescA)

        // --- Add the row at the table tbody --- //
        tbodyPlayerRace.append(clonedRowRacePlayer)
    }

    function stopPlayerRace(){

    }






    // ------ Timer ------ //
    const basicAddon1 = document.getElementById('basic-addon1')
    basicAddon1.onclick = () => {
        // --- Chrono --- //
        let start = Date.now()
        let diffStart
        setInterval(function chrono(){
            diffStart = ((Date.now() - start))
            startTimer.value = msToTime(diffStart)
        }, 10)
        basicAddon1.setAttribute('disabled', 'disabled')



        // FIXME ClearInterval()
        let start2
        setInterval(function CountDown(){
            // --- CountDown --- //
            let heures = parseInt((durationRace.value).split(':')[0] * 3600000)
            let minutes = parseInt((durationRace.value).split(':')[1] * 60000)
            if ((durationRace.value).split(':')[2]) {
                secondes = parseInt((durationRace.value).split(':')[2] * 1000)
            } else {
                secondes = 0
            }
            let timeMs = heures+minutes+secondes


            diffStart = (parseInt(start) - parseInt((Date.now())))
            let diff = parseInt(timeMs) + diffStart
            remainingTimer.value = msToTime(diff)
            console.log(diff)
            if (diff <= 0){
                clearInterval()
                console.log('Stoppp')
            }

        }, 10)
    }




    // ------ We transform to a valid display time ------ //
    function msToTime(duration) {
        let milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }
    /* function tps2String(tps_ms){
        let temps = new Date(tps_ms);
        let heures = temps.getUTCHours();
        let minutes = temps.getUTCMinutes();
        let secondes = temps.getUTCSeconds();
        let millisec = temps.getUTCMilliseconds();
        if (secondes >= 10 && minutes < 10 && heures < 10){
            if (minutes >= 10 && secondes >= 10 && heures < 10){
                if (heures >= 10 && minutes >= 10 && secondes >= 10){
                    return heures + ':' + minutes + ':' + secondes + '.' + millisec
                }
                return '0' + heures + ':' + minutes + ':' + secondes + '.' + millisec
            }
            return '0' + heures + ':0' + minutes + ':' + secondes + '.' + millisec
        }
        return '0' + heures + ':0' + minutes + ':0' + secondes + '.' + millisec
    } */
    function tps2String2(tps_ms){
        let temps = new Date(tps_ms);
        let heures = temps.getUTCHours();
        let minutes = temps.getUTCMinutes();
        let secondes = temps.getUTCSeconds();
        let millisec = temps.getUTCMilliseconds();
        return heures + ':' + minutes + ':' + secondes + '.' + millisec

    }
})