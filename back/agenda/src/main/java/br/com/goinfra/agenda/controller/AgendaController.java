package br.com.goinfra.agenda.controller;

import br.com.goinfra.agenda.model.Agenda;
import br.com.goinfra.agenda.model.Solicitante;
import br.com.goinfra.agenda.repository.AgendaRepository;
import br.com.goinfra.agenda.repository.SolicitanteRepository;
import br.com.goinfra.agenda.service.AgendaService;
import br.com.goinfra.agenda.service.SolicitanteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@RestController
public class AgendaController {

    private final Logger log = LoggerFactory.getLogger(AgendaController.class);
    @Autowired
    private AgendaService service;

    @Autowired
    private AgendaRepository repository;

    @Autowired
    private SolicitanteService solicitanteService;

    @Autowired
    private SolicitanteRepository solicitanteRepository;



    @CrossOrigin(origins = "*")
    @RequestMapping(value="/agenda/{id}", method= RequestMethod.GET)
    public ResponseEntity<?> find(@PathVariable Integer id){
        Agenda obj = service.buscar(id);

        return ResponseEntity.ok().body(obj);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value="/agenda", method= RequestMethod.GET)
    public ResponseEntity<List<Agenda>> findAll(){
        List<Agenda> list = repository.findAll();
        return ResponseEntity.ok().body(list);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value="/agenda", method= RequestMethod.POST)
    ResponseEntity<Agenda> createSolicitante(@RequestBody Agenda agenda) throws URISyntaxException {

        Solicitante solicitante = solicitanteService.findCPF(agenda.getSolicitante().getCpf());

        agenda.setSolicitante(solicitante);

        log.info("Request to create agenda: {}", agenda);
        Agenda result = repository.save(agenda);
        return ResponseEntity.created(new URI("/agenda/" + result.getId()))
                .body(result);
    }



    @RequestMapping(value ="agenda/{id}",method = RequestMethod.PUT)
    public ResponseEntity<Agenda> update(@RequestBody Agenda agenda,@PathVariable Integer id ) throws URISyntaxException {
        service.update(agenda);
        Agenda novaAgenda = service.buscar(id);
        return ResponseEntity.created(new URI("/agenda/" + novaAgenda.getId()))
                .body(novaAgenda);
    }

    @RequestMapping(value="agenda/{id}", method= RequestMethod.DELETE)
    public String delete(@PathVariable Integer id){
        repository.deleteById(id);
        return "Agenda "+ id +" excluída com sucesso!";
    }

}
