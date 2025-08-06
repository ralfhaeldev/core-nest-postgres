#!/bin/bash

# Verifica que se haya pasado un nombre
if [ -z "$1" ]; then
  echo "❌ Debes proporcionar el nombre del módulo. Ejemplo:"
  echo "./generate-structure.sh orders"
  exit 1
fi

# Nombre del módulo (en minúscula)
MODULE_NAME=$1

echo "🚀 Generando estructura para el módulo: $MODULE_NAME"

# Crear carpetas DDD
mkdir -p src/$MODULE_NAME/domain/entities
mkdir -p src/$MODULE_NAME/application/use-cases
mkdir -p src/$MODULE_NAME/infrastructure/repositories
mkdir -p src/$MODULE_NAME/interfaces/controllers
mkdir -p src/$MODULE_NAME/interfaces/dtos

# Generar módulo NestJS
nest g mo $MODULE_NAME

# Generar controlador
nest g co $MODULE_NAME/interfaces/controllers/${MODULE_NAME::-1} --flat

# Generar DTO
nest g cl $MODULE_NAME/interfaces/dtos/create-${MODULE_NAME::-1}.dto --flat

# Generar entidad
nest g cl $MODULE_NAME/domain/entities/${MODULE_NAME::-1}.entity --flat

# Generar interfaz de repositorio
nest g interface $MODULE_NAME/domain/repository --flat
mv src/$MODULE_NAME/domain/repository.interface.ts src/$MODULE_NAME/domain/${MODULE_NAME}-repository.interface.ts

# Generar repositorio TypeORM
nest g cl $MODULE_NAME/infrastructure/repositories/typeorm-${MODULE_NAME::-1}.repository --flat

# Generar caso de uso
nest g cl $MODULE_NAME/application/use-cases/create-${MODULE_NAME::-1}.use-case --flat

echo "✅ Estructura de $MODULE_NAME creada con éxito."

