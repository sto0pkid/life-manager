function isArray(value : string | readonly string[]): value is readonly string[] {
    return Array.isArray(value) && typeof value[0] === 'string'
}

function checkIdWellFormed(id : string | readonly string[] | undefined) : id is string {
    return typeof id !== 'undefined' && !isArray(id)
}

function checkId(id : string | readonly string[] | undefined, collection : {[key:string]: any}) : id is string{
    return checkIdWellFormed(id) && (id in collection)
}

export {
    isArray,
    checkIdWellFormed,
    checkId
}