package br.com.goinfra.agenda.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "agenda")
public class Agenda implements Serializable {
    private static final long serialVersionUID = 1;
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "solicitante_cpf")
    private Solicitante solicitante;

    private Integer ramal;
    private String local;
    private String dataInicial;
    private String dataFinal;
    private String horaInicial;
    private String horaFinal;

    private Agenda(){
    }

    public Agenda(Integer id, Solicitante solicitante, Integer ramal, String local, String dataInicial, String dataFinal, String horaInicial, String horaFinal) {
        this.id = id;
        this.solicitante = solicitante;
        this.ramal = ramal;
        this.local = local;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.horaInicial = horaInicial;
        this.horaFinal = horaFinal;
    }
}
