import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Web3 from 'web3';

import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dto';
import { abi } from '../contracts/Dog.json';
import { address } from '../contracts/Dog-address.json';

@Injectable()
export class DogsService {
  async create(createDogDto: CreateDogDto): Promise<Dog> {
    
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

    try {
      const result = await contract.methods.registerDog(id, dog.name, dog.breed, dog.color, dog.availableForAdpt).send({ from: '0xda50f755351cB8977Aff1b3A82a0630BEB1e9da4', gas: '500000' });

      return dog;
    } catch (error) {
      console.error('Error al interactuar con el contrato:', error);
      throw error;
    }
  }

  async findAll(): Promise<Dog> {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:7545')
    );

    const contract = new web3.eth.Contract(abi, address);

    try {
      // Llama a un método del contrato
      const result = await contract.methods.findDog('493eeeac-1a0d-4a4d-871f-751b33711e07').call();
      
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
