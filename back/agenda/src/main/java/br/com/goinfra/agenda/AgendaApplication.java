package br.com.goinfra.agenda;

import br.com.goinfra.agenda.model.Solicitante;
import br.com.goinfra.agenda.repository.SolicitanteRepository;
import br.com.goinfra.agenda.service.SolicitanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class AgendaApplication  implements CommandLineRunner {

	@Autowired
	private SolicitanteRepository solicitanteRepository;

	public static void main(String[] args)  {
		SpringApplication.run(AgendaApplication.class, args);
	}

	@Override
	public void run (String... args) throws Exception{
		Solicitante sol1 = new Solicitante("12345678910","Pedro Henrique","Tecnologia da Informação");
		Solicitante sol2 = new Solicitante("10987654321","João da Silva","Vendas");
		solicitanteRepository.saveAll(Arrays.asList(sol1,sol2));
	}


}
