export function millisToMinutesAndSeconds (millis) {
    if (isNaN(millis)) {
      return '--:--'
    }
  
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000).toFixed(0)
    
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}