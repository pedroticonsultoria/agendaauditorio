package br.com.goinfra.agenda.controller;

import br.com.goinfra.agenda.model.Solicitante;
import br.com.goinfra.agenda.service.SolicitanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="/solicitante")
public class SolicitanteController {

    @Autowired
    private SolicitanteService service;

    @RequestMapping(value="/{cpf}", method= RequestMethod.GET)
    public ResponseEntity<?> find(@PathVariable String cpf){


        Solicitante obj = service.buscar(cpf);

        return ResponseEntity.ok().body(obj);

    }

}
