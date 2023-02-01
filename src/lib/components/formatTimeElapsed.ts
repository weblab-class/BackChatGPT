export function formatTimeElapsed(msElapsed: number): string {
    let seconds = msElapsed / 1000

    const hours = Math.floor(seconds / 3600)
    seconds = seconds % 3600 // seconds remaining after hours

    const minutes = Math.floor(seconds / 60)

    seconds = Math.floor(seconds % 60) // seconds remaining after minutes

    let outputString: string = ''

    if (hours > 0) {
        outputString += ('00' + hours).slice(-2) + ':'
    }

    outputString += ('00' + minutes).slice(-2) + ':' + ('00' + seconds).slice(-2)


    return outputString
}