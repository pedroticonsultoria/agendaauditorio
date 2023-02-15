package br.com.goinfra.agenda.repository;


import br.com.goinfra.agenda.model.Solicitante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitanteRepository extends JpaRepository<Solicitante, String> {
}
