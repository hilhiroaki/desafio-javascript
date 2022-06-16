const fs = require('fs')
const FILE_NAME = 'p1_q1_eng1000_2021-1_(exported) - Sheet1.csv'

function readFile(FILE_NAME){
    return fs.readFileSync(FILE_NAME,'utf8')
}

function organizeFile(){
    let Array = readFile(FILE_NAME).split("\r\n").splice(1)
    return Array.map(element => element.split(","))
}

function global(){
    let result = 0
    organizeFile(FILE_NAME).map(element => result = result + Number(element[3]))
    console.log("Média global: ", result/organizeFile(FILE_NAME).length)
}

function perClass(){
    let cal = organizeFile(FILE_NAME).filter(element => element[2] == "CÁLCULO 1" ? true : false)
    let rcal = sum(cal)
    let alg = organizeFile(FILE_NAME).filter(element => element[2] == "ALGEBRA LINEAR 2" ? true : false)
    let ralg = sum(alg)
    let iae = organizeFile(FILE_NAME).filter(element => element[2] == "INTRODUÇÃO A ENGENHARIA" ? true : false)
    let riae = sum(iae)
    let id = organizeFile(FILE_NAME).filter(element => element[2] == "DESENHO INDUSTRIAL 1" ? true : false)
    let rid = sum(id)
    let phy = organizeFile(FILE_NAME).filter(element => element[2] == "FÍSICA 1" ? true : false)
    let rphy = sum(phy)
    
    console.log(`Média de Cálculo 1: ${rcal/cal.length}`)
    console.log(`Média de Álgebra Linear 2: ${ralg/alg.length}`)
    console.log(`Média de Introdução à Engenharia: ${riae/iae.length}`)
    console.log(`Média de Desenho Industrual 1: ${rid/id.length}`)
    console.log(`Média de Física 1: ${rphy/phy.length}`)
}

function sum(Element){
    let RElement = 0
    Element.map(element => RElement = RElement + Number(element[3]))
    return RElement
}

function perStudent(ID){
    let student = organizeFile(FILE_NAME).filter(element => element[0] == ID ? true : false)
    let result = 0
    let name = student[0][1].split(" ").map(element => element[0] + element.slice(1).toLowerCase()).join().replaceAll(","," ")
    let scores = student.map(element => result = result + Number(element[3]))
    console.log(`Média de ${name}: ${result/scores.length}`)
    return result/scores.length
}

function allStudents(){
    let student = organizeFile(FILE_NAME)
    let IDs = student.map(element => element[0])
    let uniqueIDs = [...new Set(IDs)]
    uniqueIDs.map(element => perStudent(element))
}

function approved(id){
    return perStudent(id) > 5 ? true : false
}

global(FILE_NAME)
perClass(FILE_NAME)
allStudents(FILE_NAME)
console.log(approved(1820865))