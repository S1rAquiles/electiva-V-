class ToggleButton extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		super(config.scene);
		this.scene=config.scene;

		this.back=this.scene.add.image(0,0,config.backKey);
		this.onIcon=this.scene.add.image(0,0,config.onIcon);
		this.offIcon=this.scene.add.image(0,0,config.offIcon);

		Align.scaleToGameW(this.back,.1);
		Align.scaleToGameW(this.onIcon,.05);
		Align.scaleToGameW(this.offIcon,.05);

		this.add(this.back);
		this.add(this.onIcon);
		this.add(this.offIcon);

		if (!config.value)
		{
			config.value=1;
		}

		this.value=config.value;

		if (config.event)
		{
			this.event=config.event;
		}

		this.setIcons();

		this.back.setInteractive();
		this.back.on('pointerdown',this.toggle,this);

		if (config.x)
		{
			this.x=config.x;
		}
		if (config.y)
		{
			this.y=config.y;
		}
		this.setSize(this.back.displayWidth,this.back.displayHeight);
		
		this.scene.add.existing(this);
	}
	setNoScroll() {
		this.back.setScrollFactor(0);
		this.onIcon.setScrollFactor(0);
		this.offIcon.setScrollFactor(0);
	}
	toggle()
	{
		this.value=!this.value;
		this.setIcons();
		if (this.event)
		{
			emitter.emit(this.event,this.value);
		}
	}
	setIcons()
	{
		if (this.value==1)
		{
			this.onIcon.visible=1;
			this.offIcon.visible=!1;
		}
		else
		{
			this.onIcon.visible=!1;
			this.offIcon.visible=1;
		}
	}
}