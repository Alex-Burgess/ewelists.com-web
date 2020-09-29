import pytest
import delete_product


class TestDeleteProduct:
    def test_delete_product(self, dynamodb_mock):
        assert delete_product.main('12345678-prod-0010-1234-abcdefghijkl', 'products-unittest')

    def test_delete_product_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            delete_product.main('12345678-prod-0010-1234-abcdefghijkl', 'products-wrong')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestDeleteFromTable:
    def test_delete_successful(self, dynamodb_mock):
        assert delete_product.delete_from_table('12345678-prod-0010-1234-abcdefghijkl', 'products-unittest')

    def test_delete_product_that_does_not_exist(self, dynamodb_mock):
        assert delete_product.delete_from_table('12345678-prod-miss-1234-abcdefghijkl', 'products-unittest')

    def test_delete_errors(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            delete_product.delete_from_table('12345678-prod-0010-1234-abcdefghijkl', 'products-wrong')

        assert e.type == SystemExit
        assert e.value.code == 1
