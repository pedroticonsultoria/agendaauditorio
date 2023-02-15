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
    private Long id;

    @ManyToOne
    @JoinColumn(name = "solicitante_cpf")
    private Solicitante solicitante;

    private Integer ramal;
    private String local;
    private Date dataInicial;
    private Date dataFinal;
    private String horaInicial;
    private String horaFinal;

    private Agenda(){
    }


}
