package br.com.goinfra.agenda.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SolicitanteController {

    @RequestMapping(value="/solicitante", method= RequestMethod.GET)
    public String listar(){
        return "REST está funcionando!";
    }

}
