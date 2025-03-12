function UserProfile({params}: {params: {id: number}}) {
    return <h1> Perfil de Utilizador {params.id}</h1>
}

export default UserProfile;