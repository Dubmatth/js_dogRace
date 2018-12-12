document.addEventListener('DOMContentLoaded', function(){

    // ------ Const ------ //
    const alertMessage = document.getElementById('alertMessage')
    const nameRace = document.getElementById('nameRace')
    const countryRace = document.getElementById('countryRace')
    const durationRace = document.getElementById('durationRace')
    const beginInscription = document.getElementById('beginInscription')
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
    const btnStopRace = document.getElementsByClassName('stopRace')
    const btnLooseRace = document.getElementsByClassName('looseRace')

    // --- Hide some elements --- //
    participantsTable.hidden = true
    raceTable.hidden = true

    // ------ We fill the countries ------ //
    beginInscription.disabled = true
    country()
    let dataCountryRace
    function country(){
        fetch('./rqListePays.php')
            .then(res => res.json())
            .then(datas => {
                for(data of datas){
                    let option = document.createElement('option')
                    option.append(data.nomP)
                    countryRace.append(option)
                }
                //--- Keep all race datas ---//
                dataCountryRace = datas
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

        // --- Fill & Call choiceAnimals --- //
        selectAnimals()
        durationRace.after = choiceAnimals
        choiceAnimals.hidden = false
    }

    // ------ Add animals to inscription ------ //
    let toDisabled
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
    function deleteFromInscription(){
        // --- Delete from table --- //
        this.parentElement.parentElement.remove()
        // --- Delete from allPlayers --- //
        for(player of allPlayers){
            const indexPlayer = allPlayers.indexOf(player)
            if(this.id == player.idA){
                allPlayers.splice(indexPlayer, 1)
            }
        }
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
        remainingTimer.disabled = true
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

        // --- stop btn --- //
        const raceBtnStop = document.createElement('button')
        raceBtnStop.textContent = 'Stop'
        raceBtnStop.type = 'button'
        raceBtnStop.value = player.idA
        raceBtnStop.classList = `btn btn-primary stopRace disabled`
        // --- Loose btn --- //
        const raceBtnLoose = document.createElement('button')
        raceBtnLoose.textContent = 'Abandon'
        raceBtnLoose.type = 'button'
        raceBtnLoose.value = player.idA
        raceBtnLoose.classList = `btn btn-primary looseRace disabled`

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

    // ------ Timer ------ //
    const basicAddon1 = document.getElementById('basic-addon1')
    let playerTime
    basicAddon1.onclick = () => {
        // --- Remove class Disabled --- //
        for(btn of btnStopRace){
            btn.classList.remove('disabled')
        }
        for(btn of btnLooseRace){
            btn.classList.remove('disabled')
        }
        // --- Chrono --- //
        let start = Date.now()
        let diffStart
        const myChrono = setInterval(chrono, 10)
        function chrono(){
            diffStart = ((Date.now() - start))
            startTimer.value = msToTime(diffStart)
        }
        basicAddon1.setAttribute('disabled', 'disabled')
        // --- CountDown --- //
        const myCountDown = setInterval(countDown, 10)
        function countDown(){
            let heures = parseInt((durationRace.value).split(':')[0] * 3600000) // to ms
            let minutes = parseInt((durationRace.value).split(':')[1] * 60000) // to ms
            if ((durationRace.value).split(':')[2]) {
                secondes = parseInt((durationRace.value).split(':')[2] * 1000) // to ms
            } else {
                secondes = 0
            }
            let timeMs = heures+minutes+secondes
            diffStart = (parseInt(start) - parseInt((Date.now())))
            let diff = parseInt(timeMs) + diffStart
            remainingTimer.value = msToTime(diff)
            if (diff <= 0){
                sendRace()
                clearInterval(myChrono)
                clearInterval(myCountDown)

                // --- Manage the race buttons --- //
                for(btn of btnStopRace){
                    if (btn.textContent == 'Stop'){
                        //--- Didn't end the race ---//
                        // ----------------- Must to change his status
                        btn.textContent = startTimer.value
                        btn.setAttribute('disabled', 'disabled')
                    }
                }
                for(btn of btnLooseRace){
                    btn.classList.contains('abandon') ? btn.textContent = 'Abandon' : btn.textContent = 'Course finie'
                    btn.setAttribute('disabled', 'disabled')
                }
                // --- Reset the timers --- //
                startTimer.value = '00:00:00.000'
                remainingTimer.value = '00:00:00:000'
            }
            // --- Loop for check click event on all buttons --- //
            for(btn of btnLooseRace){
                btn.onclick = looseRacePlayer
            }
            // ------ Loose race ------ //
            function looseRacePlayer(){
                this.classList.add('abandon')
                this.textContent = 'Abandon'
                this.setAttribute('disabled', 'disabled')
            }

            // --- Loop for check click event on all buttons --- //
            for(let btn of btnStopRace){
                btn.onclick = stopRacePlayer

            }
            // ------- Stop the player's race ------ //
            function stopRacePlayer(){
                for(player of allPlayers){
                    if (player.idA == this.value){
                        this.textContent = startTimer.value
                        this.disabled = true
                        this.parentElement.nextSibling.disabled = true
                        this.parentElement.nextSibling.childNodes[0].textContent = "Course finie"

                    }
                }
            }
        }
    }

    // ------ We send the race ------ //
    let insertIdc
    function sendRace(){
        // --- Data's Race --- //
        let date = new Date()
        /* const idC = auto increment */
        const nomC = nameRace.value
        /* const descC = */
        const dateC = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        const lieuC = dataCountryRace[countryRace.selectedIndex - 1].codeP
        let data = {
            nomC: nomC,
            dateC: dateC,
            lieuC: lieuC
        }
        fetch('./rqInsertCourse.php', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: 'course='+JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res => {
            insertIdc = res
            for(player of allPlayers){
                sendResult()
            }
        })
    }

    let data = {}
    let statut = ''
    function sendResult(){
        for (btn of btnStopRace){
            playerTime = btn.textContent
            btn.classList.contains('abandon') ? statut = 'A' : statut = 'T'
            data = {
                idC: insertIdc,
                idA: player.idA,
                temps: playerTime,
                statut: statut
            }
            fetch('./rqInsertResultat.php', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: 'resultat='+JSON.stringify(data)
            })
        }
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
})