document.addEventListener('DOMContentLoaded', function(){

    // ------ Const ------ //
    const nameRace = document.getElementById('nameRace')
    const countryRace = document.getElementById('countryRace')
    const durationRace = document.getElementById('durationRace')
    const beginInscription = document.getElementById('beginInscription')
    const infosRace = {}
    const mainDiv = document.getElementById('mainDiv')
    const choiceAnimals = document.getElementById('choiceAnimals')


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

        // --- Call choiceAnimals --- //
        durationRace.after = choiceAnimals
        choiceAnimals.hidden = false
    }





})