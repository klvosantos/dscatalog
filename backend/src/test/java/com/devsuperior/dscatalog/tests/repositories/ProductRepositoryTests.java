package com.devsuperior.dscatalog.tests.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@DataJpaTest  // carrega apenas os componentes do spring data jpa
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository;
	
	private long existingId;
	private long nonexistingId;
	private long countTotalProducts;
	private long countPCGamerProducts;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonexistingId = 1000L ;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
	}
	
	@Test
	public void findShouldReturnAllProductsWhenNameDoesNotExist() {
		
		String name = "Camera";		
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertTrue(result.isEmpty());			
	}
	
	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {
		
		String name = "";		
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());		
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		
		String name = "pc gAMeR";		
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());		
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		
		String name = "PC Gamer";		
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());	
		
		// assertFalse precisa que o resultado do teste isEmpty() seja falso.
		// result.isEmpty() // isEmpty() verifica se o obj result esta vazio.
		// se isEmpty() for false significa que o result não esta vazio, assim fazendo com que o teste assertFalse tenha sucesso.
	}
	
	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
	}
		
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		
		repository.deleteById(existingId);
		
		Optional<Product>  result = repository.findById(existingId);
		
		Assertions.assertFalse(result.isPresent());		
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonexistingId);	
		});
	}
}





