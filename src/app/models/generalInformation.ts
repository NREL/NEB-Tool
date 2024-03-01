export interface GeneralInformation {
    name: string,
    country: string,
    city: string,
    state: string,
    zip: string,
    address: string,
    naics1: string,
    naics2: string,
    naics3: string,
    contactName: string,
    contactPhone: string,
    contactEmail: string,
    contactRole: string
}


export function getGeneralInformation(name: string): GeneralInformation {
    return {
        name: name,
        country: '',
        city: '',
        state: '',
        zip: '',
        address: '',
        naics1: '',
        naics2: '',
        naics3: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        contactRole: ''
    }
}