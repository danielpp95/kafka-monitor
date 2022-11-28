export const message1 = `namespace Contracts.DTO.Pokemon
{
    using System;
    using System.Collections.Generic;
    using DTO.DigitalAsset;

    public class Evolution
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int EvolutionLevel { get; set; }

        public IEnumerable<DigitalAsset> DigitalAssets { get; set; }
        string Name2 { get; set; }
    }
}`

export const message2 = `namespace Contracts.DTO.Pokemon
{
    using System;
    using System.Collections.Generic;
    using DTO.DigitalAsset;

    public class AutomaticObsoleteDispatcherCommand
    {
        public Guid CommandId { get; set; }

        public DateTime ProductCreationStartDate { get; set; }

        public DateTime ProductCreationEndDate { get; set; }

        public int Version { get; set; }

        public string RoutingKey { get; set; }

    }
}`