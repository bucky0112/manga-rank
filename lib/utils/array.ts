const listToObj = (list: string[]) => {
  return list?.map((item: string) => {
    const [uuid, name] = item.split('§')
    return {
      uuid,
      name
    }
  })
}

export { listToObj }
