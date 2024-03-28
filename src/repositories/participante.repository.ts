import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Participante, ParticipanteRelations, Dia, Tarefa} from '../models';
import {TarefaRepository} from './tarefa.repository';
import {DiaRepository} from './dia.repository';

export class ParticipanteRepository extends DefaultCrudRepository<
  Participante,
  typeof Participante.prototype.id,
  ParticipanteRelations
> {

  public readonly dias: HasManyThroughRepositoryFactory<Dia, typeof Dia.prototype.id,
          Tarefa,
          typeof Participante.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TarefaRepository') protected tarefaRepositoryGetter: Getter<TarefaRepository>, @repository.getter('DiaRepository') protected diaRepositoryGetter: Getter<DiaRepository>,
  ) {
    super(Participante, dataSource);
    this.dias = this.createHasManyThroughRepositoryFactoryFor('dias', diaRepositoryGetter, tarefaRepositoryGetter,);
    this.registerInclusionResolver('dias', this.dias.inclusionResolver);
  }
}
