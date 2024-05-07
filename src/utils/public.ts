export const currentTheme = ref<any>(null)

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (!bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export const formatDate = (date: any, format = 'YYYY-MM-DD HH:mm:ss') => {
  return useDateFormat(date, format)
}
