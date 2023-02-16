package br.com.goinfra.agenda.service;

import br.com.goinfra.agenda.model.Agenda;
import br.com.goinfra.agenda.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository repo;

    public Agenda buscar(Integer id){
        Optional<Agenda> obj = repo.findById(id);
        return obj.orElse(null);
    }
}
