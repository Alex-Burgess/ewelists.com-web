import pytest
import create_list


class TestMain:
    def test_create_list(self, dynamodb_mock, capsys):
        assert create_list.main('12345678-user-0001-1234-abcdefghijkl', 'lists-unittest')
        captured = capsys.readouterr()
        assert len(captured.out.strip('\n')) == 36

    def test_create_fails_with_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_list.main('12345678-user-0001-1234-abcdefghijkl', 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateList:
    def test_create_successful(self, dynamodb_mock):
        list_id = create_list.create('12345678-user-0001-1234-abcdefghijkl', 'lists-unittest')
        assert len(list_id) == 36

    def test_create_list_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            create_list.create('12345678-user-0001-1234-abcdefghijkl', 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1
