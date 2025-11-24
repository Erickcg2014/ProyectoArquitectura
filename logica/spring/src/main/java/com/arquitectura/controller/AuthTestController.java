package com.arquitectura.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthTestController {

    @GetMapping("/public/hello")
    public String helloPublic() {
        return "👋 Hola visitante público (no autenticado)";
    }

    @GetMapping("/user/hello")
    public String helloUser() {
        return "🙋 Hola usuario autenticado con rol USER";
    }

    @GetMapping("/provider/hello")
    public String helloProvider() {
        return "💼 Hola proveedor autenticado con rol PROVIDER";
    }

    @GetMapping("/admin/hello")
    public String helloAdmin() {
        return "🛠️ Hola administrador autenticado con rol ADMIN";
    }
}
