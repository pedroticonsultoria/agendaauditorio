package br.com.goinfra.agenda.service;

import br.com.goinfra.agenda.model.Solicitante;
import br.com.goinfra.agenda.repository.SolicitanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SolicitanteService {

    @Autowired
    private SolicitanteRepository repo;

    public Solicitante buscar(String cpf){
        Optional<Solicitante> obj = repo.findById(cpf);
        return obj.orElse(null);
    }
}
