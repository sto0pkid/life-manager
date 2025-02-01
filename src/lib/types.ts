function isArray(value : string | readonly string[]): value is readonly string[] {
    return Array.isArray(value) && typeof value[0] === 'string'
}

export { isArray }