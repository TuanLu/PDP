<?php
$installer = $this;
$installer->startSetup();
$installer->run("
	INSERT INTO {$this->getTable('mst_pdp_artwork_category')} (`id`, `title`, `status`, `position`) VALUES
    (1, 'Animals', 1, 1),
    (2, 'Funny', 1, 0),
    (3, 'Sport', 1, 0),
    (4, 'Love', 1, 0),
    (5, 'Flag', 1, 0);

	INSERT INTO {$this->getTable('mst_pdp_images')} (`image_type`, `filename`, `category`, `color`, `position`) VALUES
    ('custom', 'Custom-Image-1397706223.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706224.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706225.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706226.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706227.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706228.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706229.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706230.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706231.png', '1', '', 0),
    ('custom', 'Custom-Image-1397706277.svg', '5', '', 0),
    ('custom', 'Custom-Image-1397706301.png', '4', '', 0),
    ('custom', 'Custom-Image-1397706302.png', '4', '', 0),
    ('custom', 'Custom-Image-1397706303.png', '4', '', 0),
    ('custom', 'Custom-Image-1397706304.png', '4', '', 0),
    ('custom', 'Custom-Image-1397706305.png', '4', '', 0),
    ('custom', 'Custom-Image-1397706306.png', '4', '', 0),
    ('custom', 'Custom-Image-1397706760.png', '2', '', 0),
    ('custom', 'Custom-Image-1397706761.png', '2', '', 0),
    ('custom', 'Custom-Image-1397706762.png', '2', '', 0),
    ('custom', 'Custom-Image-1397706763.png', '2', '', 0),
    ('custom', 'Custom-Image-1397706764.png', '2', '', 0),
    ('custom', 'Custom-Image-1397706765.png', '2', '', 0),
    ('custom', 'Custom-Image-1397706789.png', '3', '', 0),
    ('custom', 'Custom-Image-1397706790.png', '3', '', 0),
    ('custom', 'Custom-Image-1397706791.png', '3', '', 0),
    ('custom', 'Custom-Image-1397706792.png', '3', '', 0),
    ('custom', 'Custom-Image-1397706793.png', '3', '', 0),
    ('custom', 'Custom-Image-1397706794.png', '3', '', 0),
    ('custom', 'Custom-Image-1397706795.png', '3', '', 0);

    INSERT INTO {$this->getTable('mst_pdp_fonts')} (`name`, `ext`) VALUES
    ('Montague', 'ttf'),
    ('PARSELTO', 'TTF'),
    ('Playball', 'ttf'),
    ('QuentinCaps', 'ttf'),
    ('riesling', 'ttf'),
    ('Trocadero', 'ttf'),
    ('Vnhltfap', 'ttf'),
    ('Vntfap01', 'ttf'),
    ('Vnthfap2', 'TTF'),
    ('Vnthfap3', 'TTF'),
    ('Vnthfapf', 'TTF'),
    ('Bleeding Cowboys', 'ttf'),
    ('BURNSTOW', 'TTF'),
    ('cac_champagne', 'ttf'),
    ('DesperadoFLF', 'ttf'),
    ('GoodDog', 'otf'),
    ('HARRYP', 'TTF'),
    ('Lobster', 'otf'),
    ('LUMOS', 'TTF'),
    ('MadeWithB', 'ttf'),
    ('MAJOR', 'otf'),
    ('Marlboro', 'ttf');
");
$installer->endSetup(); 
