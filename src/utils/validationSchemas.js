import * as yup from 'yup'

export const errorRegisterSchema = yup.object().shape({
    email: yup.string().email("Formato Email inválido").required("Campo correo electrónico obligatorio"),
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
    repeatPass: yup.string().required("Campo repetir contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
    tel: yup.number().required("Campo número telefónico obligatorio").min(10, "Formato inválido. El número de teléfono debe tener 10 caracteres")
})

export const errorRegisterOnAdminSchema = yup.object().shape({
    email: yup.string().email("Formato Email inválido").required("Campo correo electrónico obligatorio"),
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
    role: yup.string().required("Campo rol del usuario obligatorio"),
    tel: yup.number().required("Campo número telefónico obligatorio").min(10, "Formato inválido. El número de teléfono debe tener 10 caracteres")
})

export const errorEditUserSchema = yup.object().shape({
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    role: yup.string().required("Campo rol del usuario obligatorio")
})

export const errorLoginSchema = yup.object().shape({
    email: yup.string().email('Formato Email inválido').required('Campo correo electrónico obligatorio'),
    pass: yup.string().required("Campo contraseña obligatorio")
})

export const errorContactSchema = yup.object().shape({
    email: yup.string().email('Formato Email inválido').required('Campo correo electrónico obligatorio'),
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    comment: yup.string().required("Campo comentarios obligatorio").min(5, "Mínimo de 5 caracteres")
})

export const errorProdSchema = yup.object().shape({
    name: yup.string().required('Campo nombre del producto obligatorio'),
    price: yup.number().required("Campo precio del producto obligatorio"),
    desc: yup.string().required("Campo descripción obligatorio"),
    img: yup.string().required("Campo URL de imagen obligatorio").url("Formato URL inválido"),
    cat: yup.string().required("Campo categoría obligatorio")
})

export const errorTurnOnAdminSchema = yup.object().shape({
    namePatient: yup.string().required('Campo nombre del paciente obligatorio'),
    email: yup.string().required("Campo correo electrónico obligario").email("Formato email inválido"),
    desc: yup.string().required('Campo descripción obligatorio'),
    nameOwner: yup.string().required('Campo nombre del dueño obligatorio'),
    tel: yup.number().required('Campo número telefónico obligatorio').min(10, "Formáto inválido. El número de teléfono debe tener 10 caracteres"),
    vet: yup.string().required("Campo veterinario obligatorio"),
    date: yup.string().required("Campo fecha obligatorio"),
    time: yup.string().required("Campo hora obligatorio"),
    raza: yup.string().required("Campo raza y especie obligatorio")
})
export const errorTurnSchema = yup.object().shape({
    namePatient: yup.string().required('Campo nombre del paciente obligatorio'),
    desc: yup.string().required('Campo descripción obligatorio'),
    vet: yup.string().required("Campo veterinario obligatorio"),
    date: yup.string().required("Campo fecha obligatorio"),
    time: yup.string().required("Campo hora obligatorio"),
    raza: yup.string().required("Campo raza y especie obligatorio")
})
export const errorEditTurnSchema = yup.object().shape({
    namePatient: yup.string().required('Campo nombre del paciente obligatorio'),
    raza: yup.string().required("Campo raza y especie obligatorio")
})
export const errorPlanSchema = yup.object().shape({
    email: yup.string().email('Formato Email inválido').required('Campo email obligatorio'),
    name: yup.string().required('Campo nombre y apellido obligatorio'),
    tel: yup.number().required('Campo número telefónico obligatorio').min(10, "Formáto inválido. El número de teléfono debe tener 10 caracteres")
})