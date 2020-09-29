import pytest
import add_gift


@pytest.fixture
def notfound_product():
    return {
      "brand": "John Lewis",
      "details": "Trike",
      "productUrl": "https://www.johnlewis.com/john-lewis-partners-my-first-wooden-trike/p4779147"
    }


@pytest.fixture
def products_product():
    return {
      "brand": "Mini Micro",
      "retailer": "johnlewis.com",
      "price": "79.99",
      "details": "Scooter",
      "productUrl": "https://www.johnlewis.com/mini-micro-deluxe-scooter-2-5-years/aqua/p3567221",
      "imageUrl": "https://johnlewis.scene7.com/is/image/JohnLewis/235862595?$rsp-pdp-port-1440$"
    }


class TestAddGifts:
    def test_add_notfound_gift(self, dynamodb_mock, capsys):
        assert add_gift.main(
            'lists-unittest',
            'notfound-unittest',
            '12345678-list-0001-1234-abcdefghijkl',
            '12345678-user-0001-1234-abcdefghijkl',
            '../fixtures/notfound.json'
        )
        captured = capsys.readouterr()
        assert len(captured.out.strip('\n')) == 36

    def test_add_products_gift(self, dynamodb_mock, capsys):
        assert add_gift.main(
            'lists-unittest',
            'products-unittest',
            '12345678-list-0001-1234-abcdefghijkl',
            '12345678-user-0001-1234-abcdefghijkl',
            '../fixtures/product.json'
        )
        captured = capsys.readouterr()
        assert len(captured.out.strip('\n')) == 36

    def test_add_gift_with_quantity(self, dynamodb_mock, capsys):
        assert add_gift.main(
            'lists-unittest',
            'products-unittest',
            '12345678-list-0001-1234-abcdefghijkl',
            '12345678-user-0001-1234-abcdefghijkl',
            '../fixtures/product.json',
            '2'
        )
        captured = capsys.readouterr()
        assert len(captured.out.strip('\n')) == 36

    def test_create_notfound_with_bad_fixture_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            add_gift.main(
                'lists-unittest',
                'notfound-unittest',
                '12345678-list-0001-1234-abcdefghijkl',
                '12345678-user-0001-1234-abcdefghijkl',
                '../fixtures/product.json'
            )

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_create_products_with_bad_fixture_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            add_gift.main(
                'lists-unittest',
                'products-unittest',
                '12345678-list-0001-1234-abcdefghijkl',
                '12345678-user-0001-1234-abcdefghijkl',
                '../fixtures/notfound.json'
            )

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_create_product_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            add_gift.main(
                'lists-unittest',
                'notfound-wrong',
                '12345678-list-0001-1234-abcdefghijkl',
                '12345678-user-0001-1234-abcdefghijkl',
                '../fixtures/notfound.json'
            )

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_add_to_list_fails(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            add_gift.main(
                'lists-wrong',
                'notfound-wrong',
                '12345678-list-0001-1234-abcdefghijkl',
                '12345678-user-0001-1234-abcdefghijkl',
                '../fixtures/notfound.json'
            )

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateProduct:
    def test_create_notfound(self, dynamodb_mock, notfound_product):
        product_id = add_gift.create_product('notfound-unittest', '12345678-user-0001-1234-abcdefghijkl', notfound_product)
        assert len(product_id) == 36

    def test_create_product(self, dynamodb_mock, products_product):
        product_id = add_gift.create_product('products-unittest', '12345678-user-0001-1234-abcdefghijkl', products_product)
        assert len(product_id) == 36

    def test_create_product_with_wrong_table(self, dynamodb_mock, products_product):
        with pytest.raises(SystemExit) as e:
            add_gift.create_product('notfound-unittest', '12345678-user-0001-1234-abcdefghijkl', products_product)
        assert e.type == SystemExit
        assert e.value.code == 1

    def test_create_notfound_with_wrong_table(self, dynamodb_mock, notfound_product):
        with pytest.raises(SystemExit) as e:
            add_gift.create_product('products-unittest', '12345678-user-0001-1234-abcdefghijkl', notfound_product)
        assert e.type == SystemExit
        assert e.value.code == 1

    def test_wrong_table_errors(self, dynamodb_mock, notfound_product):
        with pytest.raises(SystemExit) as e:
            add_gift.create_product('notfound-wrong', '12345678-user-0001-1234-abcdefghijkl', notfound_product)

        assert e.type == SystemExit
        assert e.value.code == 1


class TestAddToList:
    def test_add_to_list(self, dynamodb_mock):
        assert add_gift.add_to_list('lists-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', 'notfound')

    def test_add_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            add_gift.add_to_list('wrong-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', 'notfound')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestGetFixture:
    def test_get_notfound_fixture(self, notfound_product):
        product = add_gift.get_fixture('../fixtures/notfound.json')
        assert product == notfound_product

    def test_get_products_fixture(self, products_product):
        product = add_gift.get_fixture('../fixtures/product.json')
        assert product == products_product

    def test_get_missing_fixture(self, products_product):
        with pytest.raises(SystemExit) as e:
            add_gift.get_fixture('../fixtures/missing.json')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestGetType:
    def test_get_notfound_type(self):
        type = add_gift.get_type('notfound_unittest')
        assert type == 'notfound'

    def test_get_products_type(self):
        type = add_gift.get_type('products_unittest')
        assert type == 'products'

    def test_invalid_table(self):
        with pytest.raises(SystemExit) as e:
            add_gift.get_type('noname_unittest')

        assert e.type == SystemExit
        assert e.value.code == 1
