import { makeDateImplementation } from '@common/adapters/date/date-factory'

const dateFactory = makeDateImplementation()

/**
 * @param dateString date in string
 * @param inputFormat input date format
 * @param outputFormat output date format
 * @returns new string date in format 'yyyy-MM-dd'
 * @example formatDate('01/01/2021', 'dd/MM/yyyy', 'yyyy-MM-dd') -> '2021-01-01'
 */
export function formatDate (dateOriginal: string | Date, inputFormat = 'dd/MM/yyyy', outputFormat = 'yyyy-MM-dd'): string | null {
    try {
        if (!dateOriginal) return null

        if (dateOriginal instanceof Date) return dateFactory.formatDate(dateOriginal, outputFormat)
        else {
            const date = dateFactory.parseDate(dateOriginal, inputFormat)
            return dateFactory.formatDate(date, outputFormat)
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

/**
 * @param competence string in format NOME_MES/ANO
 * @returns new string in format 'yyyymm'
 * @example formatCompetenceWithNameOfMonths('JANEIRO/2021') -> '202101'
 */
export function formatCompetenceWithNameOfMonths (competence: string): string {
    competence = competence.toUpperCase()
    const competenceSplit = competence.split('/')
    let newCompetence: string
    if (competenceSplit[0] === 'JANEIRO') newCompetence = '01'
    else if (competenceSplit[0] === 'FEVEIRO') newCompetence = '02'
    else if (competenceSplit[0] === 'MARCO') newCompetence = '03'
    else if (competenceSplit[0] === 'ABRIL') newCompetence = '04'
    else if (competenceSplit[0] === 'MAIO') newCompetence = '05'
    else if (competenceSplit[0] === 'JUNHO') newCompetence = '06'
    else if (competenceSplit[0] === 'JULHO') newCompetence = '07'
    else if (competenceSplit[0] === 'AGOSTO') newCompetence = '08'
    else if (competenceSplit[0] === 'SETEMBRO') newCompetence = '09'
    else if (competenceSplit[0] === 'OUTUBRO') newCompetence = '10'
    else if (competenceSplit[0] === 'NOVEMBRO') newCompetence = '11'
    else if (competenceSplit[0] === 'DEZEMBRO') newCompetence = '12'

    newCompetence = competenceSplit[1] + '' + newCompetence
    return newCompetence
}

/**
 * @param competence string in format 'mm/yyyy'
 * @returns new string in format 'yyyymm'
 * @example formatCompetence('01/2021') -> '202101'
 */
export function formatCompetence (competence: string): string {
    const competenceSplit = competence.split('/')
    const newCompetence = competenceSplit[1] + '' + competenceSplit[0]
    return newCompetence
}

export function generateCompetences (dateBase: Date, backOrForwart: 'back' | 'foward', howManyMonths = 12, format = 'yyyyMM'): string[] {
    const listCompetences = []
    for (let i = 0; i < howManyMonths; i++) {
        if (backOrForwart === 'back') {
            listCompetences.push(formatDate(dateFactory.subMonths(new Date(), i), '', format))
        }
    }
    return listCompetences
}

export function getCompetenceThisOrLastMonth (dayBiggerThenToGetThisMonth = 15, dateFormatToReturn = 'yyyy-MM'): string {
    const today = new Date()
    const dayToday = today.getDate()
    if (dayToday > dayBiggerThenToGetThisMonth) return formatDate(today, null, dateFormatToReturn)
    else return formatDate(dateFactory.subMonths(new Date(), 1), null, dateFormatToReturn)
}

export function formatDateWithSubstring(dateOriginal: string | Date): string | null {
    try {
        if (!dateOriginal) return null

        if (dateOriginal instanceof Date) return dateFactory.formatDate(dateOriginal, 'yyyy-MM-dd')
        else {
            return `${dateOriginal.substring(8, 10)}/${dateOriginal.substring(5, 7)}/${dateOriginal.substring(0, 4)}`
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export function promiseTimeOut (time: number): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('TIME_RESOLVED')
        }, time)
    })
}

export function generateArrayOfLines(numberLines = 100): any[] {
    const arrayLines = []
    for (let i = 0; i < numberLines; i++) {
        arrayLines.push({})
    }
    return arrayLines
}