import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Web3 from 'web3';

import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dto';
import { abi } from '../contracts/Dog.json';
import { address } from '../contracts/Dog-address.json';

@Injectable()
export class DogsService {

  create(createDogDto: CreateDogDto) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545')
    );

    const contract = new web3.eth.Contract(abi, address);

    const id: string = uuid();

    const dog = new Dog(
      id,
      createDogDto.name,
      createDogDto.breed,
      createDogDto.color,
      true
    );

    async function createDog() {
      try {
        const result = await contract.methods.registerDog(id, dog.name, dog.breed, dog.color).call({ from: '0x1B5CbA8DC580C81deF7568EbAEBA9DA72beb9D4D' });
        const tokensCreados = await contract.methods.totalSupply().call();

        console.log('Tokens creados:', tokensCreados);
      } catch (error) {
        console.error('Error al interactuar con el contrato:', error);
      }
    }

    createDog();

    return dog;
  }





  async findAll(): Promise<Dog> {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545')
    );

    const contract = new web3.eth.Contract(abi, address);

    try {
      // Llama a un método del contrato
      const result = await contract.methods.findDog('xxxxxx').call();
      
      // Formatea los datos obtenidos del contrato para que coincidan con la estructura de un "dog"
      const dog = new Dog(
        result['uuid'],
        result['name'],
        result['breed'],
        result['color'],
        result['availableForAdpt']
      );

      return dog;
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }










  async findOne(id: string) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545')
    );

    const contract = new web3.eth.Contract(abi, address);

    try {
      // Llama a un método del contrato
      const result = await contract.methods.findDog(id).call();
      
      // Formatea los datos obtenidos del contrato para que coincidan con la estructura de un "dog"
      const dog = new Dog(
        result['uuid'],
        result['name'],
        result['breed'],
        result['color'],
        result['availableForAdpt']
      );

      return dog;
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }

  /*adopt(id: number) {
    return `This action adopt a #${id} dog`;
  }*/
}
