import { loginUser } from "../src/controllers/user.controller.js";
import supertest from "supertest";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";
import bcryptjs from "bcryptjs";
import app from "../app.js";


describe("prueba función login...", () => {

    // Los casos de prueba
    // Caso exitoso de incio de sesión

    const testUser = {
        fullName: "Tester",
        email: "Test@test.com",
        password: "123"
    }

    // Antes de ejecutar los casos de prueba
    beforeEach(async () => {
        await userModel.deleteMany({});  //borramos todo lo de la base de datos
    });


    // Después de ejecutar todos los casos de prueba --> cerrar la conexión a la base de datos
    afterAll(async () => {
        await mongoose.connection.close();
    });

    //Los casos de prueba
    // 1. Caso exitoso de inicio de sesión
    it("Debería iniciar sesión correctamente con credenciales validas", async () => {

        const codedPassword = await bcryptjs.hash(testUser.password, 10); //encriptamos la contraseña
        await new userModel({ ...testUser, password: codedPassword }).save(); //nos guardamos el usuario en la base de datos
        // await userModel.create({...testUser, password: codedPassword}); //nos guardamos el usuario en la base de datos

        const response = await supertest(app)
            .post("/iniciarSesion")
            .send({
                emailLogin: "Test@test.com",
                passwordLogin: "123"
            });

        expect(response.statusCode).toBe(200);
    });

    // 2. Caso de error por usuario no encontrado
    it("No deberia iniciar sesión correctamente, correo invalido...", async () => {

        const codedPassword = await bcryptjs.hash(testUser.password, 10); //encriptamos la contraseña
        await new userModel({ ...testUser, password: codedPassword }).save(); //nos guardamos el usuario en la base de datos
        // await userModel.create({...testUser, password: codedPassword}); //nos guardamos el usuario en la base de datos

        const response = await supertest(app)
            .post("/iniciarSesion")
            .send({
                emailLogin: "Carlitos@test.com",
                passwordLogin: "123"
            });

        expect(response.statusCode).toBe(404);
    });

    //3. Caso de error por contraseña incorrecta

        it("No deberia iniciar sesión correctamente, constraseña invalida...", async () => {

        const codedPassword = await bcryptjs.hash(testUser.password, 10); //encriptamos la contraseña
        await new userModel({ ...testUser, password: codedPassword }).save(); //nos guardamos el usuario en la base de datos
        // await userModel.create({...testUser, password: codedPassword}); //nos guardamos el usuario en la base de datos

        const response = await supertest(app)
            .post("/iniciarSesion")
            .send({
                emailLogin: "Test@test.com",
                passwordLogin: "1234"
            });

        expect(response.statusCode).toBe(401);
    });

});

