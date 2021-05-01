node {

    checkout scm

    docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {

        def frontendImage = docker.build("mgafar/ticketsystem")

        /* Push the container to the custom Registry */
        frontendImage.push()
    }
}