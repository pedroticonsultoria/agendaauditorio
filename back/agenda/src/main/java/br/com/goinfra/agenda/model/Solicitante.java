package br.com.goinfra.agenda.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "solicitante")

public class Solicitante implements Serializable {
    private static final long serialVersionUID = 1;

    @Id
    private Integer cpf;
    private String nome;
    private String departamento;

    private Solicitante(){
    }
}
